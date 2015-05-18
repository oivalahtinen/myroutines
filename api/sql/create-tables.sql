CREATE TABLE `User` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Mail` VARCHAR(254) NOT NULL,
    `Password` VARCHAR(32) NOT NULL,
    PRIMARY KEY(`ID`),
    UNIQUE(`Mail`)
);

CREATE TABLE `Routine` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `UserID` INT NOT NULL,
    `Name` VARCHAR(254) NOT NULL,
    PRIMARY KEY(`ID`),
    UNIQUE(`UserID`, `Name`)
);

-- CREATE TABLE RoutineRule ...
-- CREATE TABLE RoutineMark ...
