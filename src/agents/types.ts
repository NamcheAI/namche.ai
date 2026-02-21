export interface AgentSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface AgentProfile {
  id: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  sections: AgentSection[];
}
