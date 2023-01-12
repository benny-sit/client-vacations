import React, {useDeferredValue, useEffect, useState} from 'react'
import { Vacation } from '../../types'
import {Card, CardActionArea, CardMedia, CardContent, Typography, Box, Tooltip, CardActions, Chip, Divider} from '@mui/material'
import { styled } from '@mui/material/styles';
import { Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteVacation, setEditVacation, toggleFollowing } from '../../features/vacations/vacationsSlice';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { selectIsAdmin } from '../../features/auth/authSlice';
import ModeIcon from '@mui/icons-material/Mode';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthAxios } from '../../services/api';
import { openVacationModal } from '../../features/modals/modalsSlice';
import useDebounce from '../../custom-hooks/UseDebounce';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardContentNoPadding = styled(CardContent)(`
  padding-bottom: 4px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const CardActionsNoTopPadding = styled(CardActions)(`
  padding: 2px 8px;
`);





type cardProps = {
    details: Vacation
}


export default function VacationCard({details}: cardProps) {
  const dispatch = useAppDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isAdmin = useAppSelector(selectIsAdmin);

  useDebounce(() => {
    AuthAxios.post(`/vacations/${details.isFollowing ? 'follow' : 'unfollow'}`, {
      vacationId: details.id,
    }).then((response) => {
      console.log(response);
      
    }).catch((error) => {
      console.log(details.id + " --- Error in updating follow state")
    });
  }, [details.isFollowing], 500)

  const deleteThisVacation = () => {
    AuthAxios.delete(`/admin/vacations/${details.id}`)
      .then((response) => {
        dispatch(deleteVacation({ id: details.id }));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const editThisVacation = () => {
    dispatch(setEditVacation({editVacation: details}))
    dispatch(openVacationModal({}))
  }

  const cardClick = () => {
    handleTooltipOpen();
    setTimeout(() => {
      handleTooltipClose();
    }, 500)
    dispatch(toggleFollowing({id: details.id}))
    
  }

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  }

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  return (
    <Card sx={{ maxWidth: 375}}>
      <Tooltip
        title={details.isFollowing ? "Following": "Un Following"}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={tooltipOpen}
        onClose={handleTooltipClose}
        PopperProps={{
          disablePortal: true
        }}
      >

      <CardActionArea onClick={cardClick}>
        <CardMedia
          component="img"
          height="160"
          image={details.imageUrl}
          alt="vacation Image"
          />
        <CardContentNoPadding>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Typography gutterBottom variant="h5" component="div">
            {details.destination}
          </Typography>
          {
            details.isFollowing && (
              <Icon color='error'>
          <FavoriteIcon />
          </Icon>
            )
          }
          </Box>
            {expanded ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
                <Typography variant="body2" color="text.secondary">
                {details.description}

                </Typography>
                <Typography variant='overline' display="block" gutterBottom>
                  Price: {details.price}$
                </Typography>
                <Chip icon={<AccessTimeIcon />} label={`starts: ${new Date(details.startDate).toUTCString()}`} />
                <Chip icon={<AccessTimeIcon />} label={`ends: ${new Date(details.endDate).toUTCString()}`} />
              </Box>
            
            )
            :
            (
              <Typography variant="body2" color="text.secondary">
              {details.description.substring(0, 90) + (details.description.length > 100 && " ..." || '')}
              </Typography>
            )
            }
        </CardContentNoPadding>
      </CardActionArea>
      </Tooltip>
      <CardActionsNoTopPadding disableSpacing={true}>
        {isAdmin && (
          <>
            <Tooltip title="delete">
            <IconButton aria-label="delete" onClick={deleteThisVacation}>
              <DeleteIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="edit">
            <IconButton aria-label="update" onClick={editThisVacation}>
              <ModeIcon />
            </IconButton>
            </Tooltip>
          </>          
        )}
        <Tooltip title={expanded ? "collapse" : "show more"}>
          <Box sx={{marginLeft: 'auto'}}>
        <ExpandMore
            expand={expanded}
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
        </ExpandMore>
        </Box>
        </Tooltip>
      </CardActionsNoTopPadding>
    </Card>
  )
}
