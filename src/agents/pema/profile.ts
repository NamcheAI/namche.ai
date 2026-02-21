import type { AgentProfile } from '../types';

const profile: AgentProfile = {
  id: 'pema',
  name: 'Pema',
  title: 'Agent homepage',
  description: 'Pema agent homepage for namche.ai.',
  intro: 'Pema is part of the Namche agent family. This page is the instance-specific homepage shell.',
  sections: [
    {
      heading: 'Mission',
      paragraphs: [
        'Pema will run independently with the same structural foundations as Tashi and Nima.',
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
