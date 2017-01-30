import { Model } from '@mean-expert/model';
/**
 * @module PantherEvent
 * @description
 * Write a useful PantherEvent Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class PantherEvent {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('PantherEvent: Before Save', ctx.instance);
    var app = ctx.Model.app;
    var time_now  = Date.now();
    if(ctx.isNewInstance){
      console.log('PantherEvent dataSources', app.dataSources);
      var mongoDb = app.dataSources.mymongo;
      var mongoConnector = app.dataSources.mymongo.connector;
      mongoConnector.collection("counters").findAndModify({collection:'PantherEvent'},[['_id','asc']],{$inc:{value:1}},{new:true}, function(err: string, sequence: any){
        if(err){
          throw err;
        }
        else{
          console.log('sequence', sequence);
          ctx.instance.serial = sequence.value.value;
          ctx.instance.last_occurence = time_now;
          next();
        }
      });
    }
    else{
      next();
    }
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = PantherEvent;
