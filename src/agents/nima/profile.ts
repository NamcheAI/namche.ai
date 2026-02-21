import type { AgentProfile } from '../types';

const profile: AgentProfile = {
  id: 'nima',
  name: 'Nima',
  title: 'Agent homepage',
  description: 'Nima agent homepage for namche.ai.',
  intro: 'Nima is part of the Namche agent family. This page is the instance-specific homepage shell.',
  sections: [
    {
      heading: 'Mission',
      paragraphs: [
        'Nima will run independently with the same structural foundations as Tashi and Pema.',
      ],
    },
    {
      heading: 'Status',
      items: [
        'Homepage scaffolded',
        'Content draft pending',
        'Webhook runtime pending',
      ],
    },
  ],
};

export default profile;
