module com.example.fx {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.kordamp.bootstrapfx.core;
    requires com.fasterxml.jackson.databind;
    requires java.net.http;

    opens com.example.fx to javafx.fxml;
    exports com.example.fx;
}