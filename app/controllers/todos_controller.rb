class TodosController < ApplicationController

  def index
    @todos = Todo.all

    respond_to do |format|
      format.html
      format.json {render :json => @todos}
    end
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.completed = true
    @todo.save!
    render nothing: true
  end

  def create
    @todo = Todo.new
    @todo.name = params[:name]
    @todo.save
    render :status => :created, :json => @todo
  end

  def destroy

    @todo = Todo.find(params[:id])
    @todo.destroy
    render nothing: true#:status => :created
  end


end