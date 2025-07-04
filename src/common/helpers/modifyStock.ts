export async function aumentarStock(id: number) {
  const resource = await this.resourceServices.findOne({ term: id });
  if (resource) {
    resource.quatity + 1;
  }
  return 'ok';
}

export async function disminuirStock(id: number) {
  const resource = await this.resourceServices.findOne({ term: id });
  if (resource) {
    resource.quatity - 1;
  }
  return 'ok';
}

