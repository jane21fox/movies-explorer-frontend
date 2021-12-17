import { screenStates } from './constants.js';

export const setMovies = (dataMovies, dataShownMovies, screenState) => {
    const { initialAmount } = screenStates[screenState];
    const dataObj = {
        data:
            dataMovies.length <= initialAmount
                ? dataMovies
                : dataMovies.slice(0, dataShownMovies.length > initialAmount ? dataShownMovies.length : initialAmount),
        more:
            dataMovies.length <= initialAmount
                ? false
                : true
    }
    return dataObj;
};

export const getMoreMovies = (dataMovies, dataShownMovies, screenState) => {
    const { itemsPerRow, multiplicity } = screenStates[screenState];
    let dataShownFullRow = dataShownMovies.length;

    // если после изменения разрешения экрана количество карточек в последнем ряду не соответствует макету,
    // при нажатии на кнопку "Еще" послений ряд дополняется до полного, а также отображается новый ряд
    if ((dataShownMovies.length % multiplicity > 0)
        && ((dataMovies.length - dataShownMovies.length - ((itemsPerRow - dataShownMovies.length) % multiplicity)) > 0))
        dataShownFullRow = dataShownMovies.length + (itemsPerRow - dataShownMovies.length % multiplicity);

    const dataObj = {
        data:
            dataMovies.length - dataShownFullRow <= itemsPerRow
                ? dataMovies
                : dataMovies.slice(0, dataShownFullRow + itemsPerRow),
        more:
            dataMovies.length - dataShownFullRow <= itemsPerRow
                ? false
                : true
    }
    return dataObj;
};