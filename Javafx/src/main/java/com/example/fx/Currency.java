package com.example.fx;

public class Currency {
    private String under;
    private String over;
    private Float rate;
    private String name;

    public Currency(String under, String over, Float rate) {
        this.under = under;
        this.over = over;
        this.rate = rate;
    }

    public Currency() {
    }

    public String getUnder() {
        return under;
    }

    public void setUnder(String under) {
        this.under = under;
    }

    public String getOver() {
        return over;
    }

    public void setOver(String over) {
        this.over = over;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public String getName() {
        return over.toUpperCase() + "/" + under.toUpperCase();
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return over + "/" + under + " : " + rate;
    }
}
