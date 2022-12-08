import { groupBy, isObjectLike } from "cypress/types/lodash";
import { mockData } from "../e2e/__mocks__/movieservice";
import { noMockData } from "../e2e/__mocks__/movieservice";

beforeEach(() => {
  cy.visit("/");
});

describe("should test movie application", () => {
  it("should have a textbox/input-field", () => {
    cy.get("input#searchText");
  });

  it("should be able to write something in textbox", () => {
    cy.get("input#searchText").type("Batman").should("have.value", "Batman");
  });

  it("should have one button", () => {
    cy.get("button#search").contains("Sök");
  });

  it("should be able to press button", () => {
    cy.get("button#search").contains("Sök");
    cy.get("button#search").click();
  });

  it("should get actual data by calling actual API", () => {
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.get("h3:first").contains("The Lion King");
  });

  it("should get mockData and controlling by checking URL and h3", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");
    cy.get("h3:first").contains("The Lion King");
  });

  it("should check that mockData create 4 div-elements with movies", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");

    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.get("div.movie").should("have.length", 4);
  });

  it("should check that mockData create element to show h3-headings", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("h3").should("have.length", 4);
  });

  it("should check that mockData create element to show images", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div.movie > img").should("have.length", 4);
  });

  it("should create all html with mockData", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div > div.movie").should("have.length", 4);
    cy.get("div.movie > h3").should("have.length", 4);
    cy.get("div.movie > img").should("have.length", 4);
  });

  it("should create all html with actual data", () => {
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.get("div > div.movie").should("have.length", 10);
    cy.get("div.movie > h3").should("have.length", 10);
    cy.get("div.movie > img").should("have.length", 10);
  });

  it("should get last heading", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div.movie:last > h3").contains("The Lion King 3: Hakuna Matata");
  });

  it("should get first image", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input").type("The Lion King");
    cy.get("input").should("have.value", "The Lion King");
    cy.get("button").click();

    cy.get("img").should(
      "have.attr",
      "src",
      "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg"
    );
  });

  it("all div should have class movie", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input").type("The Lion King");
    cy.get("input").should("have.value", "The Lion King");
    cy.get("button").click();

    cy.get("div").should("have.class", "movie");
  });

  it("should get error message if no input", () => {
    cy.get("button#search").click();
    cy.get("input#searchText").should("have.value", "");
    cy.get("p").should("contain", "Inga sökresultat att visa");
  });

  it("should check that noMockData contains 0 movies", () => {
    cy.intercept("GET", "http://omdbapi.com/*", noMockData).as("nomovielist");

    cy.get("input#searchText").type("Film som inte finns");
    cy.get("input").should("have.value", "Film som inte finns");
    cy.get("button").click();

    cy.get("div#movie-container > div.movies").should("have.length", 0);
  });
});
