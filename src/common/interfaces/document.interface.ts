
export interface IDocument {
  url_file: string;
  size?: number;
  name: string;
  type: ITypeDocument;

}

export interface ITypeDocument {
  type: string;
}

export interface ICreateDocument extends Omit<IDocument, 'employee' | 'type'> {
  type: number;
  employee: number;
}
