//[실습19_21] =>

import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import MovieRow from "./MovieRow.js";

import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //[실습19_1]
    this.performSearch("avengers");
  }
  //[실습19_2] [실습19_3]
  performSearch(searchTerm) {
    console.log("tmdb Web Open API를 사용하여 검색기능을 수행합니다...");
    const urlString =
      "https://api.themoviedb.org/3/search/movie?&api_key=151a10798e54869f4c8a074635ec39f6&query=" +
      searchTerm;
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("데이터를 가져오는데 성공함");
        const results = searchResults.results;
        const movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          console.log(movie.poster_path);
          console.log(movie.title);

          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });
        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.log("데이터를 가져오는데 실패함");
      }
    });
  }

  //[실습19_5]
  searchChangeHandler(event) {
    console.log(event.target.value);
    //[실습20_2]
    const boundObj = this;
    const searchTerm = event.target.value;
    boundObj.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        {/* 실습2 => JSX Comment 처리 */}
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app-icon" width="60" src="logo.svg" />
              </td>
              <td width="8" />
              <td>
                <h2>영화검색 DB프로젝트</h2>
              </td>
            </tr>
          </tbody>
        </table>
        {/* 실습4 => inline style sheet */}
        <input
          style={{
            fontSize: 15,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          //[실습20_1]
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="찾고자하는 영화 키워드를 입력하세요."
        />

        {/* 실습7 */}
        {this.state.rows}
      </div>
    );
  }
}

export default App;
