CREATE TABLE User (
    ID INT NOT NULL AUTO_INCREMENT,
    Mail VARCHAR(254) NOT NULL,
    Password VARCHAR(32) NOT NULL,
    PRIMARY KEY(ID),
    UNIQUE(Mail)
);
