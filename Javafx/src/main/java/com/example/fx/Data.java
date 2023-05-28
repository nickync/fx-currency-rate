package com.example.fx;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Data {
//    https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json
    private List<Currency> currencyList;

    public Response getCurrencyList(String date) throws IOException {
        String url = String.format("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/%s/currencies/usd.json", date);

        HttpRequest request = HttpRequest.newBuilder().uri(
                URI.create(url))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200){
                throw new Exception("API call failed");
            }
        } catch (IOException | InterruptedException e){
            System.out.println(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        ObjectMapper mapper = new ObjectMapper();
        Response res = mapper.readValue(response.body(), Response.class);

        return res;
    }

    public Map<String, String> getCurrencyDefinition() throws Exception {
//        https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json
        HttpRequest request = HttpRequest.newBuilder().uri(
                URI.create("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200){
            throw new Exception("API call failed");
        }
        String res = response.body();
        List<String> ccyDefinition = Arrays.stream(res.replace("{", "").replace("}", "").split(",")).toList();
        Map<String, String> ccyMap = new HashMap<>();
        ccyDefinition.forEach(ccy -> {
            String[] ccyMapping = ccy.trim().split(":");
            ccyMap.put(ccyMapping[0].replaceAll("\"", "").toLowerCase(), ccyMapping[1].replaceAll("\"", "").toLowerCase().trim());
        });
        return ccyMap;
    }

}
