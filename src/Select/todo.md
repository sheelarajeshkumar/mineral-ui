# Select

### MVP

* Placeholder
* States - hover, focus, etc
* Controlled/uncontrolled
* Uses Dropdown/Popover/Menu components
* Keyboard nav
  * open/close and navigate menu
  * Simplified typeahead
* Works in FormField
* Variants
* Disabled
* ReadOnly
* Sizes


### Not MVP

* Multiple item selection
* Tagging
* Input typeahead filtering
* Native select
* Avatars
* Store items in instance variable [perf]
* Render props
* Custom item renderer for root item


### Design Questions

* Component width
  * Question for all of our form elements
* Clearable


### TODO

* SelectTrigger
  * disabled
  * readonly
  * sizes
  * renders MenuItem
    * Determine relationship/responsibilities with FauxControl
* Select Menu width
  * Not always a hierarchical DOM relationship
  * Root must be measured and pass to child
* MenuItem selected
  * Implement in MenuItem or Select? isSelected or [aria-selected=true]
* Select - finish control props pattern
* Fix Flow types
  * Flat and hierarchical data pop
  * Prop getters
* Examples
  * Portal
  * States
    * Fix issue with simulated states
  * More...
    * Async data loading?
    * Extract examples from kitchen sink.
* Best practices
* Test coverage
  * Unit tests
  * Snapshots
* Does CardTitleMenu need updated?
* Update prop getter functions to not require passing empty props object
* Mark public prop getters as private
* Validate prop getter implementation
  * Ensure overrides in correct order
  * Remove scope where possible
  * Compose event handlers when needed
* Validate id's set/passed correctly/consistently
* isMounted pattern needed?
* Cross browser testing
* A11y testing
* Test in CRA


### Intentional Changes

* Close Select, Dropdown, Popover on blur outside component
* Added typeahead to Dropdown
* Added highlightedIndex control prop to dropdown
* Menu and Dropdown now support both flat and hierarchical data prop

### Followup

* Publish mineral-ui-icons package
* Implement render props across Popover components
* Avatar component should extract 2 letters
* Avatar renders icon prop as <span icon="[object Object]" in basic usage example
* Add "built-in" avatar support to MenuItem, similar to icons
* CustomRender examples updated to render something simple besides an Avatar
