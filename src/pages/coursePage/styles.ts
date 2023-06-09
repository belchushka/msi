import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    top_image: {
        flex: 3,
        backgroundColor: 'black'
    },
    swiper: {
        flex: 0.8,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#00000033'
    },
    base_info: {
        flex: 6,
        padding: 20
    },
    text_header: {
        fontSize: 28,
        fontFamily: 'DeeDee-Bold',
        color: 'black',
        marginTop: 32,
        marginBottom: 12,
    },
    text_subheader: {
        fontSize: 24,
        fontFamily: 'DeeDee-Bold',
        color: 'black',
        marginTop: 20,
        marginBottom: 12
    },
    text: {
        fontSize: 18,
        lineHeight: 22,
        fontFamily: 'DeeDeeLight',
        color: '#76787A'
    },

    tag_container: {
        borderColor: "#A4CE57",
        borderRadius: 8,
        justifyContent: 'center',
        minWidth: 92,
        alignItems: 'center',
        borderWidth: 2,
        padding: 8,
    },

    tag_text: {
        fontFamily: 'DeeDee',
        fontSize: 16,
        color: "#A4CE57"
    },
    tag_row: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },

    option_text: {
        fontFamily: 'DeeDee',
        fontSize: 20
    },
    
    selected_option_text: {
        fontFamily: 'DeeDee',
        color: '#A4CE57',
    },

    deselected_option_text: {
        fontFamily: 'DeeDee',
        color: 'black',
    },

    options_background: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    selected_background: {
        borderBottomColor: '#A4CE57',
        borderBottomWidth: 3,
    }
      
  
});
