import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Skeleton,
} from '@mui/material';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { TypeNews } from '../../atom/news.atom';

export const LoadingNewsCard = () => {
  return (
    <Card className={classNames(`hover:cursor-pointer h-full content-center`)}>
      <Skeleton height={'100%'} width={'100%'} animation="wave" />
    </Card>
  );
};

export const NewsCard = (props: TypeNews) => {
  const onClick = useCallback(
    (url) => () => {
      window.open(url);
    },
    []
  );
  return (
    <Card
      onClick={onClick(props.url)}
      className={classNames(`hover:cursor-pointer`)}
    >
      <CardHeader
        title={props.title}
        subheader={props.createdAt}
        subheaderTypographyProps={{
          textAlign: 'right',
        }}
      />
      <CardMedia
        component={'img'}
        height="100"
        image={props.imgUrl}
        alt={props.editor}
      />
      <CardContent>
        <Typography variant="body2" color="GrayText">
          {props.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};
