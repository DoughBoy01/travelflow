import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      success: false,
      error: {
        statusCode: status,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || 'An error occurred',
        details:
          typeof exceptionResponse === 'object'
            ? (exceptionResponse as any).error
            : undefined,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        requestId: 'req_' + Date.now(),
      },
    };

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(errorResponse.error)}`,
    );

    response.status(status).json(errorResponse);
  }
}
