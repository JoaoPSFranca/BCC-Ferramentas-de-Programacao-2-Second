package br.edu.ifsp.pep.bcc.domain.serviceOrder.model;

public enum Status {
    OPEN("aberta"),
    COMPLETED("Concluída");

    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
