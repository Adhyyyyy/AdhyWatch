import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../Constants/constants';
import axios from '../../axios';
import YouTube from 'react-youtube';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState();
  const [videoId, setVideoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const movies = response.data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        setMovie(randomMovie);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const fetchVideoId = (movieId) => {
    axios
      .get(`movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const videos = response.data.results;
        if (videos.length > 0) {
          setVideoId(videos[0].key);
        } else {
          console.log('No videos found');
        }
      })
      .catch((error) => {
        console.error('Error fetching video ID:', error);
      });
  };

  const handlePlayClick = () => {
    if (movie) {
      fetchVideoId(movie.id);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVideoId(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title : ''}</h1>
        <div className="banner_buttons">
          <button className="button" onClick={handlePlayClick}>
            Play
          </button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ''}</h1>
      </div>
      <div className="fade_bottom"></div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            {videoId && (
              <YouTube videoId={videoId} opts={{ height: '390', width: '640' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
