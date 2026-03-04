import type { Core } from '@strapi/strapi';
import seed from './seed';

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  // Content types that should be publicly readable
  const readableTypes = [
    'api::program.program',
    'api::article.article',
    'api::success-story.success-story',
    'api::partner.partner',
    'api::team-member.team-member',
    'api::hero.hero',
    'api::impact-statistic.impact-statistic',
    'api::global-setting.global-setting',
    'api::ways-to-help.ways-to-help',
    'api::about-page.about-page',
  ];

  // Contact message should allow create (form submissions)
  const creatableTypes = ['api::contact-message.contact-message'];

  const existingPermissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  const existingActions = new Set(existingPermissions.map((p: any) => p.action));

  const permissionsToCreate: { action: string; role: number; enabled: boolean }[] = [];

  for (const uid of readableTypes) {
    for (const action of ['find', 'findOne']) {
      const actionId = `${uid}.${action}`;
      if (!existingActions.has(actionId)) {
        permissionsToCreate.push({ action: actionId, role: publicRole.id, enabled: true });
      }
    }
  }

  for (const uid of creatableTypes) {
    const actionId = `${uid}.create`;
    if (!existingActions.has(actionId)) {
      permissionsToCreate.push({ action: actionId, role: publicRole.id, enabled: true });
    }
  }

  if (permissionsToCreate.length > 0) {
    for (const perm of permissionsToCreate) {
      await strapi.db.query('plugin::users-permissions.permission').create({ data: perm });
    }
    strapi.log.info(`Configured ${permissionsToCreate.length} public API permissions.`);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.SEED_DATA === 'true') {
      await seed(strapi);
    }

    // Ensure public role has read access to all content APIs
    await ensurePublicPermissions(strapi);
  },
};
