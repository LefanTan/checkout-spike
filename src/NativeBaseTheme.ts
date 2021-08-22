/**
 * Themes related objects to be used in extending NativeBase's default theme
 */

export const NBColor = {
    // 400 is the standard shade
    primary: {
        100: '#ec929a',
        200: '#e46772',
        300: '#dd3c49',
        400: '#dc3745',
        500: '#c32230',
        600: '#981b25',
        700: '#6d131b'
    },
    secondary: {
        100: '#fcfcfc',
        200: '#f2eded',
        300: '#c6c2c2',
        400: '#aea9aa',
        500: '#959192',
        900: '#323031'
    }
}

export const NBFontConfig = {
    primary: {
        300: {
            normal: 'Quicksand-Light'
        },
        400: {
            normal: 'Quicksand-Regular'
        },
        500: {
            normal: 'Quicksand-Medium'
        },
        600: {
            normal: 'Quicksand-SemiBold'
        },
        700: {
            normal: 'Quicksand-Bold'
        },
    }
}

export const NBFont = {
    heading: 'primary',
    body: 'primary',
    mono: 'primary'
}

/* Define default styles for components here */
export const NBComponents = {
    Text: {
        defaultProps: {
            fontFamily: 'body',
            fontWeight: '500',
            fontSize: 30,
        },
        // react native style prop
        baseStyle: {
            color: 'secondary.100',
        },
        // Custom variation for this component, set using variant prop
        variants: {
            primary: {
                color: 'primary.400'
            },
            secondary: {
                color: 'secondary.900'
            }
        }
    },
    Input:{
        defaultProps:{
            fontWeight: 500,
            bg: 'secondary.200',
            variant: "filled"
        },
        baseStyle:{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 3,
            borderRadius: 10,
            placeholderTextColor: "primary.100",
            color: 'primary.400',
        },
        variants:{
            input:{
                bg: 'transparent',
                border: 'transparent',
                color: 'secondary.200',
                borderBottomColor:"secondary.200",
                borderBottomWidth: 0.2,
                paddingLeft: 0,
                borderRadius: 0
            }
        }
    },
    Heading: {
        variants: {
            title: {
                color: 'secondary.200',
                fontWeight: 400
            }
        }
    },
    Button: {
        defaultProps: {
        },
        baseStyle: {
            // For some reason these doesn't work?
            // color: 'secondary.400',
            // backgroundColor: 'secondary.200'
        },
        variants: {
            default:{
                bg: 'secondary.200',
                paddingX: 1.5,
                paddingY: 1,
                _text: {color: 'primary.400'},
                _pressed: {bg : 'secondary.300'}
            }
        }
    }
}