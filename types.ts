export interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  content: string[]; // Paragraphs
  imageCaption?: string;
  hasAnimation?: boolean;
}

export enum AnimationStep {
  INTRO = 0,
  INGESTION = 1,
  ACTIVATION = 2,
  CONVERSION = 3,
  REPAIR = 4,
  COMPLETE = 5
}