###
@class Accordion

@author
  James E Baxley III
  NewSpring Church

@version 0.1

@note
  Handles interactions of accordions based on data- parameters

###
class Accordion
  constructor: (@data, attr) ->

    # Get data from attribute
    params = @data.attributes[attr].value.split(',')

    params = params.map (param) -> param.trim()
    # [todo] - write better string to value and array method
    # solution for arrays in params object
    if params.length > 3
      meta = params.splice(0, 2)
      json = params.join(',')
      params = meta.concat json

    # Define properties
    @_properties = {
      _id: params[0]
      target : @data
      type : params[1]
    }

    if EventEmitter? then @.events = new EventEmitter()

    # Bind click envents to accordion behaviors
    @.bindClicks()


  bindClicks: =>

    # Find triggers within accordion
    triggers = @_properties.target.querySelectorAll('[data-accordion-trigger]')

    # Add triggers to properties
    @_properties.triggers = triggers

    for trigger in triggers

      # Expand bellow if clicked
      expand = (event) =>

        event.preventDefault()

        @.expandBellow event.target.parentNode, event

      # bind click events
      trigger.addEventListener 'click', expand, false



  expandBellow: (bellow, event) =>

    klassName = 'expanded'

    if @_properties.type is 'multi'
      core.toggleClass bellow, klassName

    else

      for trigger in @_properties.triggers

        if bellow is trigger.parentNode
          core.toggleClass(bellow, klassName)


        else
          # get current class list
          klassString = trigger.parentNode.className

          # See if target class is in current class list
          nameIndex = klassString.indexOf klassName


          klassString = klassString.replace(klassName,'');

          # updated elements class name
          trigger.parentNode.className = klassString.trim()

    @.events.emit('toggled', event)

    this



if core?
  core.addPlugin('Accordion', Accordion, '[data-accordion]')
