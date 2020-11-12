<?php
class Playlist {
    public $playlist_id;
    public $name;
    public $description;
    public $imageUrl;
    public $spotifyUrl;
    public $externalUrl;

    /**
     * @return mixed
     */
    public function getExternalUrl()
    {
        return $this->externalUrl;
    }

    /**
     * @param mixed $externalUrl
     */
    public function setExternalUrl($externalUrl)
    {
        $this->externalUrl = $externalUrl;
    }


    /**
     * @return mixed
     */
    public function getPlaylistId()
    {
        return $this->playlist_id;
    }

    /**
     * @param mixed $playlist_id
     */
    public function setPlaylistId($playlist_id)
    {
        $this->playlist_id = $playlist_id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getImageUrl()
    {
        return $this->imageUrl;
    }

    /**
     * @param mixed $imageUrl
     */
    public function setImageUrl($imageUrl)
    {
        $this->imageUrl = $imageUrl;
    }

    /**
     * @return mixed
     */
    public function getSpotifyUrl()
    {
        return $this->spotifyUrl;
    }

    /**
     * @param mixed $spotifyUrl
     */
    public function setSpotifyUrl($spotifyUrl)
    {
        $this->spotifyUrl = $spotifyUrl;
    }

    public function __toString()
    {
        return $this->name . ''. $this->description;
    }
}
