import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  meta: {
    timestamp: string;
    requestId: string;
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If data already has the response structure, return as is
        if (data && data.success !== undefined) {
          return data;
        }

        // Otherwise, wrap it
        return {
          success: true,
          data,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: 'req_' + Date.now(),
          },
        };
      }),
    );
  }
}
