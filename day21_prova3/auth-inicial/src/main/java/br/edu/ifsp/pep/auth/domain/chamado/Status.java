package br.edu.ifsp.pep.auth.domain.chamado;

public enum Status {
    ABERTO("aberto"),
    EM_ANDAMENTO("em_andamento"),
    AGUARDANDO_CLIENTE("aguardando_cliente"),
    REABERTO("reaberto"),
    FINALIZADO("finalizado");

    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
