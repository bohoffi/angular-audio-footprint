import {Subscriber} from 'rxjs/Subscriber';

/**
 * @see http://blog.2muchcoffee.com/how-to-avoid-multiple-subscription-in-angular-2-component/
 */
// creating the decorator DestroySubscribers
export function ClearSubscriptions() {
    return function (target: any) {

        // decorating the function ngOnDestroy
        target.prototype.ngOnDestroy = ngOnDestroyDecorator(target.prototype.ngOnDestroy);

        // decorator function
        function ngOnDestroyDecorator(onDestroyFunc) {
            return function () {

                // saving the result of ngOnDestroy performance to the variable superData
                const superData = onDestroyFunc ? onDestroyFunc.apply(this, arguments) : null;

                if (this._subscriptions) {
                    Object.keys(this._subscriptions).forEach(subKey => {
                        const subscriber = this._subscriptions[subKey];
                        if (subscriber && subscriber instanceof Subscriber && !subscriber.closed) {
                            subscriber.unsubscribe();
                        }
                    });
                }

                // returning the result of ngOnDestroy performance
                return superData;
            };
        }

        // returning the decorated class
        return target;
    };
}
