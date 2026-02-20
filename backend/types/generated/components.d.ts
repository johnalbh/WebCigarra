import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutNavLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_links';
  info: {
    description: 'Navigation menu link';
    displayName: 'Nav Link';
    icon: 'layer';
  };
  attributes: {
    children: Schema.Attribute.JSON;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDonationTier extends Struct.ComponentSchema {
  collectionName: 'components_sections_donation_tiers';
  info: {
    description: 'Donation level with impact description';
    displayName: 'Donation Tier';
    icon: 'heart';
  };
  attributes: {
    amountCOP: Schema.Attribute.Integer;
    amountUSD: Schema.Attribute.Integer;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    highlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    impact: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    period: Schema.Attribute.String;
  };
}

export interface SectionsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_items';
  info: {
    description: 'Frequently asked question';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_stat_cards';
  info: {
    description: 'Impact statistic card';
    displayName: 'Stat Card';
    icon: 'chartBubble';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface SectionsTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_timeline_items';
  info: {
    description: 'Historical timeline entry';
    displayName: 'Timeline Item';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_infos';
  info: {
    description: 'Contact information block';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    city: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    description: 'Call to action button';
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'accent']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for pages';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media link';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'twitter', 'youtube', 'linkedin', 'tiktok']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.nav-link': LayoutNavLink;
      'sections.donation-tier': SectionsDonationTier;
      'sections.faq-item': SectionsFaqItem;
      'sections.stat-card': SectionsStatCard;
      'sections.timeline-item': SectionsTimelineItem;
      'shared.contact-info': SharedContactInfo;
      'shared.cta-button': SharedCtaButton;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
