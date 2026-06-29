export function gerarMapa(alunos, linhas = 5, colunas = 5) {
  const grid = [];

  for (let linha = linhas; linha >= 1; linha--) {
    for (let coluna = 1; coluna <= colunas; coluna++) {
      const posicao = `${linha}${coluna}`;

      const aluno = alunos.find(
        (a) => String(a.posicao).trim() === posicao
      );

      grid.push({
        posicao,
        aluno,
      });
    }
  }

  return grid;
}

/**
 * encontra aluno por posição
 */
export function findAlunoByPosicao(alunos, posicao) {
  return alunos.find((a) => String(a.posicao) === String(posicao));
}
