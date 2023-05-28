package com.example.fx;

import java.util.Map;

public class Response {
    public String date;
    public Map<String, Float> usd;

    public Response(){

    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Map<String, Float> getUsd() {
        return usd;
    }

    public void setUsd(Map<String, Float> usd) {
        this.usd = usd;
    }

    public Response(String date, Map<String, Float> usd) {
        this.date = date;
        this.usd = usd;
    }
}
