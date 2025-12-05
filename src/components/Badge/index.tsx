import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Tooltip, TooltipProps } from '@mui/material';

interface CustomizedBadgesProps extends BadgeProps{
    icon: React.ReactNode,
    count: number,
    color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
    tooltip?: string,
    tooltipPlacement?: TooltipProps['placement'],
    disabled?:boolean,
    handleFunt?: Function,
    href?: string // thêm href nếu muốn nhảy link,
    bgcolor?: string,
    colorHover?: string
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedBadges(props: CustomizedBadgesProps) {
    const { icon, count, color = 'error', tooltip, tooltipPlacement = 'bottom', disabled, handleFunt, href, bgcolor = 'transparent', colorHover } = props;
    
    const handleClick = () => {
        if (handleFunt) handleFunt()
    }

    return (
        <Tooltip title={tooltip} placement={tooltipPlacement} arrow disableFocusListener disableHoverListener>
            <span>
                <IconButton 
                    aria-label="cart"
                    onClick={href ? undefined : handleClick}
                    component={href ? 'a' : 'button'}
                    href={href}
                    target={href ? '_blank' : undefined}
                    rel={href ? 'noopener noreferrer' : undefined}
                    disabled={disabled}
                    sx={{
                        '&:hover': {
                            bgcolor: bgcolor,
                            color: colorHover
                        }
                    }}
                >
                    <StyledBadge badgeContent={count} color={color}>
                        {icon}
                    </StyledBadge>
                </IconButton>
            </span>
        </Tooltip>
    );
}