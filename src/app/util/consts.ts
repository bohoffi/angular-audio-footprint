import { ChartOpts, WrapperOpts } from './interfaces';

export const defaultWrapperOpts: WrapperOpts = {
    // fftSize: 256,
    fftSize: 512,
    // interval: 250
    interval: 100
};

export const defaultChartOpts: ChartOpts = {
    cellHeight: 2,
    cellWidth: 5,
    cellX: 5,
    cellY: 2
};
