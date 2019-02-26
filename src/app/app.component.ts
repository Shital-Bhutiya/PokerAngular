import { Component } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Poker Game Angular';
  //database
  players = ['Jhon', 'Shital', 'Riya'];
  cards = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
  suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
  ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jeck', 'Queen', 'King'];
  pokerHand = [];

  constructor(private http: HttpClient) {
    // initialize our pokerHand with random suit and ranks for players
    for (let i = 0; i < this.players.length; i++) {
      let Cards = [];
      for (let j = 0; j < this.cards.length; j++) {
        var card = { Suit: this.suits[Math.floor(Math.random() * this.suits.length)], Rank: this.ranks[Math.floor(Math.random() * this.suits.length)] }
        Cards.push(card);
      }
      this.pokerHand.push({
        Name: this.players[i],
        Cards: Cards
      })
    }
  }

  // handle  change for any suits
  public handleSuitChange(playerIndex, cardIndex, suitValue) {
    this.pokerHand[playerIndex].Cards[cardIndex].Suit = suitValue;
  }

  // handle  change for any Ranks
  public handleRankChange(playerIndex, cardIndex, rankValue) {
    this.pokerHand[playerIndex].Cards[cardIndex].Rank = rankValue;
  }

  //Add players
  public AddPlayer() {
    var person = prompt("Please enter your name", "");
    
    if (person == null || person == "" || person == undefined) {
      person = prompt("Please enter your name", "");
    } else{
      var Cards = [];
      for (let j = 0; j < this.cards.length; j++) {
        var card = { Suit: this.suits[Math.floor(Math.random() * this.suits.length)], Rank: this.ranks[Math.floor(Math.random() * this.suits.length)] }
        Cards.push(card);
      }
      this.pokerHand.push({ Name: person, Cards: Cards })
    }    
  }

  // Send request to our api to find winner
  public FindWinner() {
    let table: object;
    table = {
      TableId: 1, PokerHands: this.pokerHand
    }
    // becuase of get I'm sending object in url.
    this.http.get('http://localhost:60434/api/PokerTable/?pokerTable=' + JSON.stringify(table)).subscribe(function (x) {
      // will display winner or tie winners
      window.alert(x);
    },
      // display error if anything goes wrong
      function (err) {
        window.alert('Oops something went Wrong');
      })
  }
}
