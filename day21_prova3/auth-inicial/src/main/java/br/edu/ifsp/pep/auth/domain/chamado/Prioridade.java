package br.edu.ifsp.pep.auth.domain.chamado;

public enum Prioridade {
    BAIXA("baixa"),
    MEDIA("media"),
    ALTA("alta");

    private String prioridade;

    Prioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public String getPrioridade() {
        return prioridade;
    }
}
