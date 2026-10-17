export function idadeEmAnos(dataNascimento) {
    if (!dataNascimento) return null;
    const nasc = new Date(dataNascimento);
    if (Number.isNaN(nasc.getTime())) return null;

    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

    return idade;
}

export const isMenorDeIdade = (dataNascimento) => {
    const idade = idadeEmAnos(dataNascimento);
    return idade !== null && idade < 18;
};
