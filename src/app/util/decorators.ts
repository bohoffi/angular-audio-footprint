import {Subscriber} from 'rxjs/Subscriber';

/**
 * @see http://blog.2muchcoffee.com/how-to-avoid-multiple-subscription-in-angular-2-component/
 */
// creating the decorator DestroySubscribers
export function ClearSubscriptions() {
  return function (target: any) {

    // decorating the function ngOnDestroy
    target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);

    // returning the decorated class
    return target;
  };
}

function ngOnDestroyDecorator(onDestroyFunc) {
  return function () {

    // saving the result of ngOnDestroy performance to the variable superData
    const superData = onDestroyFunc ? onDestroyFunc.apply(this, arguments) : null;

    if (this._subscriptions) {
      Object.keys(this._subscriptions)
        .map(subKey => this._subscriptions[subKey])
        .filter(subscriber => {
          return subscriber && subscriber instanceof Subscriber && !subscriber.closed;
        })
        .forEach(subscriber => {
          subscriber.unsubscribe();
        });
    }

    // returning the result of ngOnDestroy performance
    return superData;
  };
}
