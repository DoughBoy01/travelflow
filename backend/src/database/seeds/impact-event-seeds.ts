import { DataSource } from 'typeorm';

const IMPACT_EVENTS = [
  {
    title: 'Improved Meal Options on NYC-LAX Route',
    description:
      'Based on traveler feedback, we partnered with a new catering service to offer healthier, fresher meal options on this popular route.',
    category: 'airline_meal',
    relatedFeedbackIds: [],
    travelersImpacted: 15000,
    occurredAt: new Date('2025-10-01'),
  },
  {
    title: 'Hotel Room WiFi Speed Upgraded',
    description:
      'Multiple guests reported slow WiFi speeds. We upgraded our internet infrastructure to provide 100 Mbps connections in all rooms.',
    category: 'hotel_amenities',
    relatedFeedbackIds: [],
    travelersImpacted: 5000,
    occurredAt: new Date('2025-10-15'),
  },
  {
    title: 'Extended Lounge Hours',
    description:
      'Due to popular demand from early morning travelers, we extended lounge opening hours from 5 AM to 4 AM at major hubs.',
    category: 'airline_service',
    relatedFeedbackIds: [],
    travelersImpacted: 8000,
    occurredAt: new Date('2025-11-01'),
  },
  {
    title: 'Improved Check-in Process',
    description:
      'We streamlined the hotel check-in process with mobile key technology, reducing wait times by 70%.',
    category: 'hotel_service',
    relatedFeedbackIds: [],
    travelersImpacted: 12000,
    occurredAt: new Date('2025-11-10'),
  },
];

export async function seedImpactEvents(dataSource: DataSource) {
  console.log('💫 Seeding impact events...');

  const impactRepository = dataSource.getRepository('impact_events');

  for (const event of IMPACT_EVENTS) {
    const existing = await impactRepository.findOne({
      where: { title: event.title },
    });

    if (!existing) {
      await impactRepository.save(event);
      console.log(`  ✓ Created impact event: ${event.title}`);
    } else {
      console.log(`  ⊘ Impact event already exists: ${event.title}`);
    }
  }

  console.log('✅ Impact event seeding complete');
}
