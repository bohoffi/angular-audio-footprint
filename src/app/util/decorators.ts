import {Subscriber} from 'rxjs/Subscriber';

/**
 * @see http://blog.2muchcoffee.com/how-to-avoid-multiple-subscription-in-angular-2-component/
 */
// creating the decorator DestroySubscribers
export function ClearSubscriptions() {
  return decorTarget;
}

function decorTarget(target: any) {
  // decorating the function ngOnDestroy
  target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);

  // returning the decorated class
  return target;
}

function ngOnDestroyDecorator(onDestroyFunc) {
  return function () {

    // saving the result of ngOnDestroy performance to the variable superData
    const superData = onDestroyFunc ? onDestroyFunc.apply(this, arguments) : null;

    if (!this._subscriptions) {
      return superData;
    }

    unsubscribe(this);

    // returning the result of ngOnDestroy performance
    return superData;
  };
}

function unsubscribe(subscriptionHost: any) {
  Object.keys(subscriptionHost._subscriptions)
    .map(subKey => subscriptionHost._subscriptions[subKey])
    .filter(subscriber => {
      return subscriber && subscriber instanceof Subscriber && !subscriber.closed;
    })
    .forEach(subscriber => {
      subscriber.unsubscribe();
    });
}
