import { DataSource } from 'typeorm';
import { BADGE_DEFINITIONS } from '@shared/constants/badges.constants';

export async function seedBadges(dataSource: DataSource) {
  console.log('🏅 Seeding badges...');

  const badgeRepository = dataSource.getRepository('badges');

  for (const badgeDef of BADGE_DEFINITIONS) {
    const existing = await badgeRepository.findOne({
      where: { code: badgeDef.code },
    });

    if (!existing) {
      await badgeRepository.save({
        code: badgeDef.code,
        name: badgeDef.name,
        description: badgeDef.description,
        iconUrl: `/badges/${badgeDef.code.toLowerCase()}.svg`,
        criteria: badgeDef.criteria,
        pointsValue: badgeDef.pointsValue,
        rarity: badgeDef.rarity,
      });
      console.log(`  ✓ Created badge: ${badgeDef.name}`);
    } else {
      console.log(`  ⊘ Badge already exists: ${badgeDef.name}`);
    }
  }

  console.log('✅ Badge seeding complete');
}
