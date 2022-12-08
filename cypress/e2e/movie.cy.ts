import { groupBy, isObjectLike } from "cypress/types/lodash";
import { mockData } from "../e2e/__mocks__/movieservice";
import { noMockData } from "../e2e/__mocks__/movieservice";

describe("should test movieApp successfully", () => {
  it("should visit website/localhost", () => {
    cy.visit("http://localhost:1234");
  });

  it("should have a textbox/input-field", () => {
    cy.visit("http://localhost:1234");
    cy.get("input#searchText");
  });

  it("should be able to write something in textbox", () => {
    cy.visit("http://localhost:1234");
    cy.get("input#searchText").type("Batman").should("have.value", "Batman");
  });

  it("should have one button", () => {
    cy.visit("http://localhost:1234");
    cy.get("button#search").contains("Sök");
  });

  it("should be able to press button", () => {
    cy.visit("http://localhost:1234");
    cy.get("button#search").contains("Sök");
    cy.get("button#search").click();
  });

  it("should get mocked omdb-api", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*");
  });

  it("should check that mockData contains The Lion King", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");
  });

  it("should check that mockData contains 4 movies", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");

    cy.get("form#searchForm").submit();

    cy.get("div#movie-container > div.movies").should("have.length", 0);
  });

  it("should check that mockData have h3-headings", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("h3").should("have.length", 4);
  });

  it("should check that mockData have images", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div.movie > img").should("have.length", 4);
  });

  it("should create all html for mockData", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div.movie > h3").should("have.length", 4);
    cy.get("div.movie > img").should("have.length", 4);
  });

  it("should get last heading", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input#searchText").type("The Lion King");
    cy.get("input#searchText").should("have.value", "The Lion King");
    cy.get("button#search").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div.movie:last > h3").contains("The Lion King 3: Hakuna Matata");
  });

  it("should get second image", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("movielist");
    cy.get("input").type("The Lion King");
    cy.get("input").should("have.value", "The Lion King");
    cy.get("button").click();

    cy.wait("@movielist").its("request.url").should("contain", "Lion");

    cy.get("div.movie > img:nth-child(2)").contains(
      "https://imageofthelionking.jpg"
    );
  });
});

describe("should test movieApp unsuccessfully", () => {
  it("should get error message if no input", () => {
    cy.visit("http://localhost:1234");
    cy.get("button#search").click();
    cy.get("input#searchText").should("have.value", "");
    cy.get("p").should("contain", "Inga sökresultat att visa");
  });

  it("should check that noMockData contains 0 movies", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", noMockData).as("nomovielist");

    cy.get("form#searchForm").submit();

    cy.get("div#movie-container > div.movies").should("have.length", 0);
  });
});

// describe("control localStorage", () => {
//   it("should find something in localStorage", () => {
//     localStorage.setItem("movies", JSON.stringify(mockedMovies));
//     cy.visit("http://localhost:1234");
//     cy.get("div > li").should("have.length", 4);
//   });
// });
