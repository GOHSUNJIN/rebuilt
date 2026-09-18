export interface Step1Props {
  category: string | null; ptFormat: string | null; service: string | null
  selectCategory: (id: string) => void
  setPtFormat: (id: string) => void
  setService: (s: string | null) => void
}

export interface Step2Props {
  coach: string
  setCoach: (c: string) => void
}

export interface Step3Props {
  activeDay: string | null; slots: string[]
  setActiveDay: (d: string) => void
  toggleSlot: (key: string) => void
  location: string
  setLocation: (l: string) => void
  showLocation: boolean
}

export interface Step4Props {
  name: string; email: string; phone: string; notes: string
  setName: (v: string) => void; setEmail: (v: string) => void
  setPhone: (v: string) => void; setNotes: (v: string) => void
}

export interface Step5Props {
  summaryRows: { label: string; value: string | null | undefined }[]
  waUrl: string
  gmailUrl: string
  notSureYet?: boolean
  onSent: () => void
}
