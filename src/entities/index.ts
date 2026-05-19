/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: articles
 * Interface for Bivit
 */
export interface Bivit {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
}


/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: portfolios
 * Interface for Portfolios
 */
export interface Portfolios {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImages?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
  /** @wixFieldType text */
  season?: string;
}


/**
 * Collection ID: products
 * @catalog This collection is an eCommerce catalog
 * Interface for Products
 */
export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  size?: string;
  /** @wixFieldType text */
  color?: string;
  /** @wixFieldType text */
  category?: string;
}
