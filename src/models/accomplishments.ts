export interface Accomplishment {
    id: string;
    task_id: string;
    title: string;
    time_taken: number;
    challenges?: string;
    comments?: string;
    created_at: string;
    updated_at: string;
  }

export interface AccomplishmentWithProject extends Accomplishment {
  project_id?: string;
  project_name?: string;
  project_description?: string;
}

export enum ProofType {
    PULL_REQUEST = 'pull_request',
    SCREENSHOT = 'screenshot',
    DOCUMENT = 'document'
  }
  

export interface AccomplishmentProof {
  id: string;
  accomplishment_id: string;
  type: ProofType;
  title: string;
  url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProofInput {
    type: ProofType;
    title: string;
    url?: string;
  }
  
export interface AccomplishmentsWithProofs extends Accomplishment {
    proofs: AccomplishmentProof[];
  }
  