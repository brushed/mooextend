/*
---

name: Form.MultipleFileInput
description: Create a list of files that has to be uploaded
license: MIT-style license.
authors: Arian Stolwijk
requires: [Element.Event, Class, Options, Events]
provides: Form.MultipleFileInput

...
*/

Object.append(Element.NativeEvents, {
    dragenter: 2, dragleave: 2, dragover: 2, dragend: 2, drop: 2
});

if (!this.Form) this.Form = {};

Form.MultipleFile = new Class({

    Implements: [Options, Events],

    options: {
        /*
        onAdd: function(file){},
        onRemove: function(file){},
        onEmpty: function(){},
        onDragenter: function(event){},
        onDragleave: function(event){},
        onDragover: function(event){},
        onDrop: function(event){}*/
    },

    _files: [],

    initialize: function(input, list, drop, options){
    
        input = this.element = document.id(input);
        list = this.list = document.id(list);
        drop = document.id(drop);

        this.setOptions(options);

        var self = this,
            name = input.get('name');

        if (name.slice(-2) != '[]') input.set('name', name + '[]');
        input.set('multiple', true);

        list.addEvents({
            'change:relay(input)': function(e){
                Array.each(input.files, self.add, self);
                self.fireEvent('change', event);
            },
            'click:relay(a.delete)': function(e){ self.remove(this.retrieve('file')); }
        });

        function activateDrop(event, isOn){
            drop.ifClass(isOn, 'active');
            self.fireEvent( event.type, event );
        };

        if(drop && (typeof document.body.draggable != 'undefined')){
        
            input.addEvents({
            dragenter: function(event){ activateDrop(event,true); }, //self.fireEvent.bind(self, 'dragenter'),
            dragleave: function(event){ activateDrop(event,false); }, //self.fireEvent.bind(self, 'dragleave'),
            dragend: self.fireEvent.bind(self, 'dragend'),
            dragover: function(event){ 
                event.preventDefault();
                self.fireEvent(event.type, event);
            },
            drop: function(event){
                event.preventDefault();
                var dataTransfer = event.event.dataTransfer;
                if (dataTransfer) Array.each(dataTransfer.files, self.add, self);
                activateDrop(event, false);
            }
            });
/*        
            input.addEvents({
            dragenter: function(e){ activateDrop(true); console.log(e.type); self.fireEvent('dragenter'); },
            dragleave: self.fireEvent.bind(self, 'dragleave'),
            dragend: self.fireEvent.bind(self, 'dragend'),
            dragover: function(event){
                event.preventDefault();
                self.fireEvent('dragover', event);
            },
            drop: function(event){
                event.preventDefault();
                var dataTransfer = event.event.dataTransfer;
                if (dataTransfer) Array.each(dataTransfer.files, self.add, self);
                console.log("input value ",input.value);
                self.fireEvent('drop', event);
            }
            });
*/
        }

    },

    add: function(file){
    
        this._files.push(file);
        
        var newItem = this.list.getFirst().clone(true,true);          
        newItem.getElement('input').destroy();
        newItem.getElement('label').set('html', file.name + "<b>"+file.size/1024+" Kb</b>" );
        newItem.getElement('.delete').removeClass('hidden').store('file',file);
        newItem.removeClass('droppable');
        this.list.grab(newItem);

        this.fireEvent('add', file);
        return this;
    },

    remove: function(file){

        var index = this._files.indexOf(file);

        if (index != -1){
            this._files.splice(index, 1);
            this.list.getChildren()[index+1].destroy();
            this.fireEvent('remove', file);
        }
        return this;
    },

    getFiles: function(){
        return this._files;        
    }

});
