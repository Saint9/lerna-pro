export type EditorType = 'default' | 'inline' | 'distraction-free'

export interface EditorProps {
  upload: string
  type?: EditorType
}
