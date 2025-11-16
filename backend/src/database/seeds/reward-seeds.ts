import { DataSource } from 'typeorm';

const REWARDS = [
  {
    name: '$10 Travel Credit',
    description: 'Apply $10 credit to your next booking',
    type: 'travel_credit',
    pointsRequired: 500,
    valueUsd: 10.0,
    availability: null,
    imageUrl: '/rewards/travel-credit-10.png',
  },
  {
    name: '$25 Travel Credit',
    description: 'Apply $25 credit to your next booking',
    type: 'travel_credit',
    pointsRequired: 1000,
    valueUsd: 25.0,
    availability: null,
    imageUrl: '/rewards/travel-credit-25.png',
  },
  {
    name: '$50 Travel Credit',
    description: 'Apply $50 credit to your next booking',
    type: 'travel_credit',
    pointsRequired: 2000,
    valueUsd: 50.0,
    availability: null,
    imageUrl: '/rewards/travel-credit-50.png',
  },
  {
    name: 'Economy to Premium Economy Upgrade',
    description: 'Upgrade your next flight from Economy to Premium Economy',
    type: 'seat_upgrade',
    pointsRequired: 1500,
    valueUsd: 150.0,
    availability: 100,
    imageUrl: '/rewards/premium-economy.png',
  },
  {
    name: 'Premium Economy to Business Upgrade',
    description: 'Upgrade your next flight from Premium Economy to Business Class',
    type: 'seat_upgrade',
    pointsRequired: 3000,
    valueUsd: 500.0,
    availability: 50,
    imageUrl: '/rewards/business-class.png',
  },
  {
    name: 'Airport Lounge Access',
    description: 'One-time access to partner airport lounges worldwide',
    type: 'lounge_access',
    pointsRequired: 800,
    valueUsd: 50.0,
    availability: null,
    imageUrl: '/rewards/lounge-access.png',
  },
  {
    name: 'Hotel Room Upgrade',
    description: 'Upgrade to the next room category at partner hotels',
    type: 'hotel_upgrade',
    pointsRequired: 1200,
    valueUsd: 100.0,
    availability: 200,
    imageUrl: '/rewards/hotel-upgrade.png',
  },
  {
    name: '20% Off Next Booking',
    description: 'Get 20% discount on your next flight or hotel booking',
    type: 'discount',
    pointsRequired: 1500,
    valueUsd: null,
    availability: null,
    imageUrl: '/rewards/discount-20.png',
  },
  {
    name: 'VIP Fast Track',
    description: 'Priority security and boarding on your next flight',
    type: 'vip_status',
    pointsRequired: 600,
    valueUsd: 75.0,
    availability: null,
    imageUrl: '/rewards/vip-fast-track.png',
  },
  {
    name: 'Companion Lounge Pass',
    description: 'Bring a guest to the lounge with you',
    type: 'lounge_access',
    pointsRequired: 1000,
    valueUsd: 60.0,
    availability: null,
    imageUrl: '/rewards/companion-pass.png',
  },
];

export async function seedRewards(dataSource: DataSource) {
  console.log('🎁 Seeding rewards...');

  const rewardRepository = dataSource.getRepository('rewards');

  for (const reward of REWARDS) {
    const existing = await rewardRepository.findOne({
      where: { name: reward.name },
    });

    if (!existing) {
      await rewardRepository.save(reward);
      console.log(`  ✓ Created reward: ${reward.name}`);
    } else {
      console.log(`  ⊘ Reward already exists: ${reward.name}`);
    }
  }

  console.log('✅ Reward seeding complete');
}
