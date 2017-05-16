import {ArcDataObject} from '../components/chart/chart.component';
/**
 * Created by HOFFM59 on 16.05.2017.
 */
export const arcDataObjectTransformer = (data: Array<any>, index: number): ArcDataObject => {

  const rando = Math.floor(Math.random() * 40);
  const rando2 = Math.floor(Math.random() * 20);

  return {
    start: index,
    startAngle: (index + rando) * Math.PI / 180,
    endAngle: (data.length * Math.max(rando2, 1)) * Math.PI / 180
  };
};
