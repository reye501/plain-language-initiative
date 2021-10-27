import pygame
import math
import random
import sys
import copy
import os.path

filepath = os.path.dirname(__file__)

pygame.init()

# globals for user interface
WIDTH = 1000
HEIGHT = 600
score = 0
lives = 3
time = 0

# colors
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# surface
display_surface = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Spaceship Game')
fps = 30
clock = pygame.time.Clock()  # set this before the game logic

#  text
font_size = 40
font_size_small = 20
font = pygame.font.SysFont('comicsansms', font_size)  # create font object
font_small = pygame.font.SysFont('comicsansms', font_size_small)  # create font object

# timer
pygame.time.set_timer(pygame.USEREVENT + 1, 1000)

# score
current_score = 0
lives = 10

# global game state
intro = True
game_exit = False
game_over = False


# classes
class Ship():

    def __init__(self, pos, vel, angle, image):
        self.og_image = pygame.image.load(image)
        self.image = self.og_image
        self.pos = pos
        self.vel = vel
        self.angle = angle
        self.angle_vel = 0
        self.thrust = False
        self.friction = 0.9

    def create_rect(self):
        rect = self.image.get_rect(center=(int(self.pos[0]), int(self.pos[1])))  # deal breaker
        return rect

    def draw(self, canvas):
        img_rect =  self.create_rect()
        canvas.blit(self.image, img_rect)

    def rotate(self, angle):
        self.image = pygame.transform.rotate(self.og_image, math.degrees(angle) - 90)  # deal breaker

    def update(self):
        self.angle += self.angle_vel
        direction = [math.cos(self.angle), math.sin(self.angle)]  # deal breaker

        self.pos[0] += self.vel[0]
        self.pos[1] += self.vel[1]

        self.vel[0] *= self.friction
        self.vel[1] *= self.friction

        if self.pos[0] < 0:
            self.pos[0] = WIDTH
        if self.pos[0] > WIDTH:
            self.pos[0] = 0
        if self.pos[1] < 0:
            self.pos[1] = HEIGHT
        if self.pos[1] > HEIGHT:
            self.pos[1] = 0

        if self.thrust:
            self.vel[0] += direction[0]
            self.vel[1] -= direction[1]
        else:
            self.vel[0] = direction[0] * 0.75
            self.vel[1] = -direction[1] * 0.75


class Asteroid():

    def __init__(self, pos, vel, angle, image):
        self.og_image = pygame.image.load(image)
        self.image = self.og_image

        self.pos = pos
        self.vel = vel

        self.angle = angle
        self.angle_vel = math.pi / 12

        self.thrust = False
        self.friction = 1

    def create_rect(self):
        rect = self.image.get_rect(center=(int(self.pos[0]), int(self.pos[1])))  # deal breaker
        return rect

    def draw(self, canvas):
        img_rect =  self.create_rect()
        canvas.blit(self.image, img_rect)

    def rotate(self, angle):
        self.image = pygame.transform.rotate(self.og_image, math.degrees(angle) - 90)  # deal breaker

    def update(self):
        self.angle += self.angle_vel
        direction = [math.cos(self.angle), math.sin(self.angle)]  # deal breaker

        self.pos[0] += self.vel[0]
        self.pos[1] += self.vel[1]

        self.vel[0] += direction[0]
        self.vel[1] -= direction[1]


class Missiles():

    def __init__(self, pos, vel, angle, image):
        self.og_image = pygame.image.load(image)
        self.image = self.og_image

        self.pos = pos
        self.vel = vel

        self.angle = angle

        self.shot = False
        self.friction = 1

    def create_rect(self):
        rect = self.image.get_rect(center=(int(self.pos[0]), int(self.pos[1])))  # deal breaker
        return rect

    def shoot(self, canvas):
        img_rect =  self.create_rect()
        canvas.blit(self.image, img_rect)

    def rotate(self, angle):
        self.image = pygame.transform.rotate(self.og_image, math.degrees(angle) - 90)  # deal breaker

    def update(self):
        direction = [math.cos(self.angle), math.sin(self.angle)]  # deal breaker
        self.pos[0] += self.vel[0]
        self.pos[1] += self.vel[1]

        self.vel[0] += direction[0] * 4
        self.vel[1] -= direction[1] * 4



#  background
space_background = pygame.image.load(os.path.join(filepath, r'Spaceship_res\space_background.png'))
menu_square = pygame.image.load(os.path.join(filepath, r'Spaceship_res\Menu_square.png'))

#  spaceship
spaceship_image = os.path.join(filepath, r'Spaceship_res\spaceship.png')
spaceship = Ship([int(WIDTH / 2), int(HEIGHT / 2)], [0, 0], math.pi / 2, spaceship_image)

#  asteroid
asteroid_list = set([])


def start_asteroid():
    global asteroid_list
    asteroid_pos = [random.randrange(100, 900), random.randrange(100, 500)]
    asteroid_angle = random.randrange(0, 360)
    asteroid_image = os.path.join(filepath, r'Spaceship_res\asteroid.png')
    asteroid = Asteroid(asteroid_pos, [0, 0], asteroid_angle, asteroid_image)
    if len(asteroid_list) <= 12:
        asteroid_list.add(asteroid)


def spawn_asteroid(object):
    object.update()
    object.draw(display_surface)
    object.rotate(object.angle)


#  missile
missile_image = os.path.join(filepath, r'Spaceship_res\bullet.png')
missiles_list = set([])

# explosion
class Explosive(pygame.sprite.Sprite):
    def __init__(self, image, pos):
        super(Explosive, self).__init__()
        self.image = pygame.image.load(image)
        self.pos = pos
        self.counter = 0
        self.index = 0
        self.animation_time = 2
        self.moving = False
    
    def animate(self):
        rect = self.image.get_rect(center=(int(self.pos[0]), int(self.pos[1])))
        area = [self.index * 128, 0, 128, 128]
        display_surface.blit(self.image, rect, area)
        self.counter += 1
        if self.counter == self.animation_time:
            self.index += 1
            self.counter = 0
        if self.index == 5:
            self.counter = 0
            self.index = 0
            self.moving = False


explosion_image = os.path.join(filepath, r'Spaceship_res\Explosion_Large.png')
explosion = Explosive(explosion_image, [0, 0])


# restart
def restart():
    global intro, current_score, lives, game_over, game_exit, asteroid_list, missiles_list
    intro = True
    current_score = 0
    lives = 10
    game_over = False
    game_exit = False
    spaceship.pos = [int(WIDTH / 2), int(HEIGHT / 2)]
    spaceship.vel = [0, 0]
    spaceship.angle = math.pi/2
    spaceship.angle_vel = 0
    spaceship.thrust = False
    asteroid_list = set([])
    missiles_list = set([])


# buttons
start_button = pygame.image.load(os.path.join(filepath, r'Spaceship_res\Starting_button.png'))
quit_button = pygame.image.load(os.path.join(filepath, r'Spaceship_res\Quit_button.png'))


class Buttons():
    def __init__(self, button_image, placement):
        self.button_image = button_image
        self.placement = placement
        self.button_rect = self.button_image.get_rect(center=placement)

    def draw(self):
        display_surface.blit(self.button_image, self.button_rect)


# screen texts
def screen_message(text, color, y_displace=0):
    screen_text = font.render(text, True, color)  # creating the idea of the font
    text_rect = screen_text.get_rect()
    text_rect.center = [WIDTH/2, HEIGHT/2 + y_displace]
    display_surface.blit(screen_text, text_rect)


def small_screen_message(text, color, y_displace=0):
    screen_text = font_small.render(text, True, color)  # creating the idea of the font
    text_rect = screen_text.get_rect()
    text_rect.center = [int(WIDTH/2), int(HEIGHT/2 + y_displace)]
    display_surface.blit(screen_text, text_rect)


#  menu screen
def menu_screen():
    global intro
    while intro:
        pos = pygame.mouse.get_pos()
        display_surface.blit(space_background, [0, 0])  # background
        display_surface.blit(menu_square, menu_square.get_rect(center=(int(WIDTH/2), int(HEIGHT/2))))
        small_screen_message('Use arrows to move, press SPACE to shoot', WHITE, -35)
        start_but = Buttons(start_button, [350, 400])
        quit_but = Buttons(quit_button, [650, 400])
        start_but.draw()
        quit_but.draw()
        pygame.display.update()
        clock.tick(fps)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                intro = False
                pygame.quit()
                sys.exit()
                quit()
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if quit_but.button_rect.collidepoint(pos):
                    intro = False
                    pygame.quit()
                    quit()
                    sys.exit()
                if start_but.button_rect.collidepoint(pos):
                    intro = False
                    game_over = False


# scores
def player_score(score):
    print_score = font.render('Scores: ' + str(score), True, WHITE)
    text_rect = print_score.get_rect()
    text_rect.center = [120, 30]
    display_surface.blit(print_score, text_rect)


def player_lives(count):
    print_lives = font.render('Lives: ' + str(count), True, WHITE)
    text_rect = print_lives.get_rect()
    text_rect.center = [WIDTH - 120, 30]
    display_surface.blit(print_lives, text_rect)


# main game logic
def main():
    global missiles_list, asteroid_list, current_score, lives, game_over, game_exit, intro

    while not game_exit:
        
        restart()
        menu_screen()
        
        while not game_over:
            for event in pygame.event.get():  # movements of the snake
                if event.type == pygame.QUIT:
                    pygame.quit()
                    quit()
                    sys.exit()
                if event.type == pygame.USEREVENT + 1:  # important
                    start_asteroid()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        if len(missiles_list) <= 8:
                            shot_missile = Missiles(copy.deepcopy(spaceship.pos),
                                                copy.deepcopy(spaceship.vel),
                                                copy.deepcopy(spaceship.angle),
                                                missile_image)
                            missiles_list.add(shot_missile)
                    if event.key == pygame.K_UP:
                        spaceship.thrust = True
                    if event.key == pygame.K_LEFT:
                        spaceship.angle_vel = math.pi / 20
                    if event.key == pygame.K_RIGHT:
                        spaceship.angle_vel = -math.pi / 20
                if event.type == pygame.KEYUP:
                    spaceship.thrust = False
                    spaceship.angle_vel = 0
            
            # background
            display_surface.blit(space_background, [0, 0]) 

            #  soon to be removed objects
            remove_shot = set([])
            remove_rock = set([])
            
            # asteroid spawning
            for rock in asteroid_list:  
                spawn_asteroid(rock)

            # firing shots
            for shot in missiles_list:  
                shot.update()
                shot.rotate(spaceship.angle)
                shot.shoot(display_surface)
                if (shot.pos[1] < 0 or shot.pos[1] > HEIGHT) or (shot.pos[0] < 0 or shot.pos[0] > WIDTH):
                    remove_shot.add(shot)

            # collision check between asteroids and missiles and ship
            for rock in asteroid_list:  
                rock_rect = rock.create_rect()
                for shot in missiles_list:
                    shot_rect = shot.create_rect()
                    if shot_rect.colliderect(rock_rect):
                        remove_rock.add(rock)
                        remove_shot.add(shot)
                        current_score += 10
                        explosion.pos[0] = copy.deepcopy(rock.pos[0]) + 384
                        explosion.pos[1] = copy.deepcopy(rock.pos[1]) 
                        explosion.moving = True
                if rock_rect.colliderect(spaceship.create_rect()):
                    lives -= 1
                    remove_rock.add(rock)
                if (rock.pos[1] < 0 or rock.pos[1] > HEIGHT) or (rock.pos[0] < 0 or rock.pos[0] > WIDTH):
                    remove_rock.add(rock)

            asteroid_list.difference_update(remove_rock)
            missiles_list.difference_update(remove_shot)

            # display scores and lives
            player_score(current_score)  
            player_lives(lives)

            # update positions and direction of ship
            spaceship.update()  
            if spaceship.angle_vel != 0:
                spaceship.rotate(spaceship.angle)
            spaceship.draw(display_surface)

            # explosion
            if explosion.moving:
                explosion.animate()

            # losing condition
            if lives == 0:
                game_over = True
                intro = True

            # refresh
            pygame.display.update()  
            clock.tick(fps)
        

main()
