class EntityInfo {
  constructor(modelName, collectionName) {
    this.MODEL_NAME = modelName;
    this.COLLECTION_NAME = collectionName;
  }
}

export const ENTITY_INFO = {
  ENTITY_INFO_ATLETA: new EntityInfo('Atleta', 'atletas'),
  ENTITY_INFO_PROFESSOR: new EntityInfo('Professor', 'professores'),
  ENTITY_INFO_TURMA: new EntityInfo('Turma', 'turmas'),
  ENTITY_INFO_TECNICA: new EntityInfo('Tecnica', 'tecnicas'),
  ENTITY_INFO_FAIXA: new EntityInfo('Faixa', 'faixas'),
};
