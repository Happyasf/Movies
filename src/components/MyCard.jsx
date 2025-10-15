import { Card, Typography, Box } from '@mui/material';
import React from 'react';
import { img_500 } from '../utils'; // használj inkább img_500-at a minőség miatt
import { MyModal } from './MyModal';



export const MyCard = ({title, overview, vote_average, poster_path, type, id}) => {
    const[open, setOpen] = React.useState(false)
    return (
        <div onClick={()=> setOpen(true)}>
            {open && <MyModal id={id} type={type} setOpen={setOpen} open={open}/>}
            <Box
                sx={{
                    perspective: '1000px',
                    width: 250,
                    height: 360,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.8s ease',
                        '&:hover': {
                            transform: 'rotateY(180deg)',
                        },
                    }}
                >
                    {/* FRONT SIDE */}
                    <Card
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            overflow: 'hidden',
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                                transform: 'translateY(-5px)',
                            },
                        }}
                    >
                        {/* Borítókép */}
                        <Box
                            component="img"
                            src={img_500 + poster_path}
                            alt={title}
                            loading="lazy"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(0.85)',
                                imageRendering: 'auto',
                            }}
                        />

                        {/* Rating badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                background: 'rgba(0,0,0,0.7)',
                                border: '2px solid #ffcc00',
                                color: '#ffcc00',
                                borderRadius: '50%',
                                width: 42,
                                height: 42,
                                fontWeight: 'bold',
                                fontSize: 14,
                                boxShadow: '0 0 10px rgba(255,204,0,0.4)',

                            }}

                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: 12,
                                    lineHeight: 1,
                                    position: 'relative',
                                    top: 12,
                                    right: -3,
                                }}
                            >
                                {vote_average?.toFixed(1) ?? 'N/A'}⭐
                            </Typography>

                        </Box>


                    </Card>

                    {/* BACK SIDE (overview) */}
                    <Card
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            background: 'linear-gradient(145deg, #1b263b, #415a77)',
                            color: '#e0e1dd',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 2,
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#ff4d4d',
                                mb: 1,
                                textAlign: 'center',
                                textTransform: 'uppercase',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#e0e1dd',
                                textAlign: 'justify',
                                fontSize: 14,
                                opacity: 0.9,
                            }}
                        >
                            {overview || 'No description available.'}
                        </Typography>
                    </Card>
                </Box>
            </Box>
        </div>

    );
};
