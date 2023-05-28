package com.example.fx;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class Controller {
    @FXML
    private Label welcomeText;
    @FXML
    private TableView<Currency> currencyList;
    @FXML
    private TextField filterField;
    private ObservableList<Currency> currencies = FXCollections.observableArrayList();;
    @FXML
    private TableColumn conversion;
    @FXML
    private DatePicker date;
    private
    Data data = new Data();
    @FXML
    private ComboBox<String> convert1 = new ComboBox<>();
    @FXML
    private ComboBox<String> convert2;
    @FXML
    private TextField quantity;
    @FXML
    private TextField value;

    private Map<String, String> ccyMap = data.getCurrencyDefinition();

    public Controller() throws Exception {
    }

    @FXML
    protected void initialize() throws Exception {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date today = new Date();
        try{
            Response res = data.getCurrencyList(dateFormat.format(today));
            res.getUsd().forEach((ccy, value) -> currencies.add(new Currency("USD", ccy, value)));
            setCurrency(currencies);

        } catch (Error e){
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Data not available.");
            alert.setContentText("Free version of this app only contains data from 01-01-2022, some dates might be unavailable.");
            alert.showAndWait();
        }

        FilteredList<Currency> filteredList = new FilteredList<>(currencies);

        filterField.textProperty().addListener((observable, oldValue, newValue)-> {
            filteredList.setPredicate(ccy -> {
                if (newValue == null || newValue.isEmpty()){
                    return true;
                } else if (ccy.getOver().toLowerCase().contains(newValue.toLowerCase()) ){
                    return true;
                } else if (ccyMap.get(ccy.getOver().toLowerCase()).contains(newValue)){
                    return true;
                }
                return false;
            });
        } );
        currencyList.setItems(filteredList);

        quantity.setOnKeyTyped(e -> {
            if (!quantity.getText().equals("")){
                if (convert1.getSelectionModel().getSelectedItem() != null || convert2.getSelectionModel().getSelectedItem() != null){
                    calculate();
                } else {
                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                    alert.setTitle("Please set the conversion currencies");
                    alert.showAndWait();
                }

            }
        });
    }

    @FXML
    public void changeDate() throws IOException {

        try {
            Response res = data.getCurrencyList(date.getValue().toString());
            currencies.clear();
            res.getUsd().forEach((ccy, value) -> currencies.add(new Currency("USD", ccy, value)));
        } catch (Exception e){
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Data not available.");
            alert.setContentText("Free version of this app only contains data from 01-01-2022, some dates might be unavailable.");
            alert.showAndWait();
        }

        FilteredList<Currency> filteredList = new FilteredList<>(currencies);
        filterField.textProperty().addListener((observable, oldValue, newValue)-> {
            filteredList.setPredicate(ccy -> {
                if (newValue == null || newValue.isEmpty()){
                    return true;
                }
                return ccy.getOver().toLowerCase().contains(newValue.toLowerCase());
            });
        });
        currencyList = new TableView<>();
        currencyList.setItems(filteredList);
    }

    private void setCurrency(ObservableList<Currency> currencies) {
        ObservableList<String> ccyList = FXCollections.observableArrayList();
        currencies.forEach(ccy -> ccyList.add(ccy.getOver()));
        FilteredList<String> filteredList = new FilteredList<>(ccyList);

        convert1.setItems(filteredList);

//        convert1.getEditor().textProperty().addListener(((observableValue, oldValue, newValue) -> {
//            Platform.runLater(() -> {
//                filteredList.setPredicate(ccy -> {
//                    if (newValue == null || newValue.isEmpty()){
//                        return true;
//                    } else if (ccy.toLowerCase().contains(newValue.toLowerCase()) ){
//                        return true;
//                    } else if (ccyMap.get(ccy.toLowerCase()).contains(newValue)){
//                        return true;
//                    } else {
//                        return false;
//                    }
//                });
//            });
//        }));

        convert1.setOnAction(e -> {
            var some = currencyList.getItems().filtered(i -> i.getOver().equals(convert1.getSelectionModel().getSelectedItem().toLowerCase()));
            if (some.size() > 0){
                convert1.getEditor().setText(some.get(0).getOver());
            } else if (!convert1.getSelectionModel().getSelectedItem().equals("")){
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setTitle("Convert 1 - Currency does not exist");
                alert.setContentText("Please double check the currency!");
                alert.showAndWait();
            }
        });

        convert2.setItems(filteredList);
        convert2.setOnAction(e -> {
            var some = currencyList.getItems().filtered(i -> i.getOver().equals(convert2.getSelectionModel().getSelectedItem().toLowerCase()));
            if (some.size() > 0){
                convert2.getEditor().setText(some.get(0).getOver());
                calculate();
            } else if (!convert1.getSelectionModel().getSelectedItem().equals("")){
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setTitle("Convert 2 - Currency does not exist");
                alert.setContentText("Please double check the currency!");
                alert.showAndWait();
            }
        });
    }

    public void calculate(){
        var base = convert1.getSelectionModel().getSelectedItem().toLowerCase();
        var over = convert2.getSelectionModel().getSelectedItem().toLowerCase();

        float amount = Float.parseFloat(quantity.getText());

        var usdToBase = currencies.stream().filter(i -> i.getOver().equals(base)).toList().stream().findFirst().get().getRate();
        var usdToOver = currencies.filtered(i -> i.getOver().equals(over)).stream().toList().stream().findFirst().get().getRate();
        System.out.println(usdToBase);
        System.out.println(usdToOver);
        if (base.equals("usd")){
            value.setText(String.valueOf(amount * usdToOver));
        } else {
            value.setText(String.valueOf(amount * ((1 / usdToBase) * usdToOver)));
        }


//        quantity.setOnAction(e -> {
//
//        });
    }
}