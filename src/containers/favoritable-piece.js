import React, { useState, useContext, useEffect } from 'react'
import { localSettingsContext } from '../context/local-settings'
import PlayareaContext from '../context/playarea'
import { Playarea } from '../components'
import { Star } from '@styled-icons/bootstrap/Star'
import { StarFill } from '@styled-icons/bootstrap/StarFill'
import useHover from '../hooks/useHover'

export default function FavoritablePiece({ piece, favoriteHeightFraction = '0.025', favoriteColor = 'gold', ...restProps }) {
  const { addToFavorites, removeFromFavorites, favorites } = useContext(localSettingsContext)
  const { basis } = useContext(PlayareaContext)
  const [ isFavorite, setIsFavorite ] = useState(false)
  const [ isHovered, hoverRef ] = useHover()

  const favoriteHeight = `${(favoriteHeightFraction || 0.1) * basis}px`

  let Favorite
  if (isFavorite) {
    Favorite = <StarFill height={favoriteHeight} color={favoriteColor}/>
  } else {
    Favorite = isHovered && <Star height={favoriteHeight} color={favoriteColor}/>
  }

  const handleFavoriting = () => {
    isFavorite ? removeFromFavorites(piece.id) : addToFavorites(piece)
  }

  useEffect(() => {
    const inFavorites = favorites.some(favorite => favorite.id === piece.id)
    setIsFavorite(inFavorites)
  }, [favorites])

  return (
    <div
      ref={hoverRef}
      style={{ height: '100%', width: 'min-content', position: 'relative', lineHeight: 0}}
    >
      <Playarea.Piece
        {...restProps}
      />
      <div
        style={{position: 'absolute', bottom: 0, right: 0, cursor: 'pointer'}}
        onClick={handleFavoriting}
      >
        {Favorite}
      </div>
    </div>
  )
}